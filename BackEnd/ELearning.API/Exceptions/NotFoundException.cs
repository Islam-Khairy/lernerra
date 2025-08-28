namespace ELearning.API.Exceptions
{
    public class NotFoundException:AppException
    {
        public NotFoundException(string message="not found"):base(404, message)
        {
            
        }
    }
}
