namespace ELearning.API.DTOS.AuthDtos
{
    public class AuthResponseDto
    {
        public string UserId { get; set; }
        public string Token { get; set; } 
        public DateTime Expiration { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PictureUrl { get; set; }
        public IList<string> Roles { get; set; }

    }
}
