using System.Linq.Expressions;

namespace ELearning.API.Repository.IRepository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null, params string[] includes);
        Task<T> GetByIdAsync(int id);
        Task<T?> GetFirstOrDefaultAsync(Expression<Func<T, bool>> predicate, params string[] includes);

        void CreateAsync(T entity);
        void UpdateAsync(T entity);

        void DeleteAsync(T entity);
        Task SaveChangesAsync();

    }
}





    
