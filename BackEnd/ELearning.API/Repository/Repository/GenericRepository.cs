using ELearning.API.Data;
using ELearning.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;


namespace ELearning.API.Repository.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
        public GenericRepository(AppDbContext context )
        {
            _context = context;
        }
        public void CreateAsync(T entity)
        {
            _context.Set<T>().Add(entity);
        }
        public void UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T?> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }


        public async Task<T?> GetFirstOrDefaultAsync(Expression<Func<T, bool>> predicate, params string[] includes)
        {
            IQueryable<T> query = _context.Set<T>();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(predicate);
        }


        public async Task SaveChangesAsync()
        {
            await  _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<T>> GetAllAsync( Expression<Func<T, bool>>? predicate = null, params string[] includes)
        {
            IQueryable<T> query = _context.Set<T>();

            // Apply includes
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            // Apply filter
            if (predicate != null)
            {
                query = query.Where(predicate);
            }

            return await query.ToListAsync();
        }

    }
}