using ELearning.API.Data;
using ELearning.API.Entites;
using ELearning.API.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Linq;

public class PaymentRepository : IPaymentRepository
{
    private readonly AppDbContext context;

    public PaymentRepository(AppDbContext _context)
    {
        context= _context;
    }

    public async Task CreateAsync(Payment entity)
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        context.Payments.Add(entity);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Payment entity)
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        context.Payments.Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Payment entity)
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        context.Payments.Remove(entity);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Payment>> GetAllAsync()
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        return await context.Payments.ToListAsync();
    }

    public async Task<Payment?> GetByIdAsync(int id)
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        return await context.Payments.FindAsync(id);
    }

    public async Task<Payment?> GetFirstOrDefaultAsync(Expression<Func<Payment, bool>> predicate, params string[] includes)
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        IQueryable<Payment> query = context.Payments;

        foreach (var include in includes)
            query = query.Include(include);

        return await query.FirstOrDefaultAsync(predicate);
    }

    public async Task<IEnumerable<Payment>> GetAllAsync(Expression<Func<Payment, bool>>? predicate = null, params string[] includes)
    {
        //using var context = await _contextFactory.CreateDbContextAsync();
        IQueryable<Payment> query = context.Payments;

        foreach (var include in includes)
            query = query.Include(include);

        if (predicate != null)
            query = query.Where(predicate);

        return await query.ToListAsync();
    }
}
