using ELearning.API.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ELearning.API.DTOS.JwtSetting;
using ELearning.API.Services.IServices;

namespace ELearning.API.Services.Services
{
    public class TokenService:ITokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly JwtSetting _jwtSetting;
        public TokenService(UserManager<User> userManager, IOptions<JwtSetting> options)
        {
            _userManager = userManager;
            _jwtSetting = options.Value;
        }
        public async Task<string> GenerateAccessTokenAsync(User user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userManagedRoles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            foreach (var role in userManagedRoles)
            {
                roleClaims.Add(new Claim(ClaimTypes.Role, role));
            }
            var claims = new List<Claim>
            {
                new Claim (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim (JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim (JwtRegisteredClaimNames.Email, user.Email ?? string.Empty),
                new Claim ("uid", user.Id)
            };
            claims.AddRange(userClaims);
            claims.AddRange(roleClaims);


            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSetting.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSetting.Issuer,
                audience: _jwtSetting.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSetting.Duration),
                signingCredentials: signingCredentials
            );
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.WriteToken(jwtSecurityToken);
            return token;
        }
    }
}
