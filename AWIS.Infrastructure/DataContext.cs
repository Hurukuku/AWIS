namespace AWIS.Infrastructure;

using AWIS.Domain;
using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    { }

    public DbSet<Car> Cars => Set<Car>();
}