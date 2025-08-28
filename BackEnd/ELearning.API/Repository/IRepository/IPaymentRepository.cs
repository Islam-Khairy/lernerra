using ELearning.API.Data;
using ELearning.API.Entites;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ELearning.API.Repository.IRepository
{
    public interface IPaymentRepository
    {
        Task<IEnumerable<Payment>> GetAllAsync();
        Task<IEnumerable<Payment>> GetAllAsync(Expression<Func<Payment, bool>>? predicate = null, params string[] includes);
        Task<Payment> GetByIdAsync(int id);
        Task<Payment?> GetFirstOrDefaultAsync(Expression<Func<Payment, bool>> predicate, params string[] includes);
        Task CreateAsync(Payment entity);
        Task UpdateAsync(Payment entity);

        Task  DeleteAsync(Payment entity);
        //Task SaveChangesAsync();
    }
}
