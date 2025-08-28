namespace ELearning.API.Exceptions
{
    public class BadRequestException:AppException
    {
        public BadRequestException(string message="Bad Request") :
           base(400, message)
        {
        }
    }
}
