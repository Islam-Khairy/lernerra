using System.ComponentModel.DataAnnotations.Schema;

namespace ELearning.API.Entites
{
    public class ResetPassword
    {
        public int Id { get; set; }

        [ForeignKey("user")]
        public string UserId { get; set; }
        public User User { get; set; }
        public string Token { get; set; }
        public DateTime CreatedAt { get; set; }=DateTime.UtcNow;
        public bool IsUsed { get; set; }
    }
}
