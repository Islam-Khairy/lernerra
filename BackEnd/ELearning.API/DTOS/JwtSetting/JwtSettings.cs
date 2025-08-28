namespace ELearning.API.DTOS.JwtSetting
{
    public class JwtSetting
    {
        public string Key { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public double Duration { get; set; }
    }
}
