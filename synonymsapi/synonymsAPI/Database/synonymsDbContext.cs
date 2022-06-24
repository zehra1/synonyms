using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace synonymsAPI.Database
{
    public class synonymsDbContext : DbContext
    {
        public synonymsDbContext()
        {

        }

        public synonymsDbContext(DbContextOptions<synonymsDbContext> options) : base(options)
        {

        }

        public DbSet<wordConnections> wordConnections { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<wordConnections>().HasData(new List<wordConnections>()
            {
                new wordConnections
                {
                    Id=1,
                    word1 = "hurry",
                    word2 = "run"
                },
                new wordConnections
                {
                    Id=2,
                    word1 = "hurry",
                    word2 = "rush"
                },
                 new wordConnections
                {
                    Id=3,
                    word1 = "run",
                    word2 = "hurry"
                },
                  new wordConnections
                {
                    Id=4,
                    word1 = "rush",
                    word2 = "hurry"
                },
            });
        }
    }
}
