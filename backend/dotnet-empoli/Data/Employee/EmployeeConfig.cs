using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Empoli.Data.Employee;

public class EmployeeConfig : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.ToTable("Employees");

        builder.HasKey(e => e.Id);
        builder.Property(e => e.Id)
            .ValueGeneratedOnAdd();

        builder.Property(e => e.EmployeeId)
            .IsRequired()
            .HasMaxLength(100);
        builder.HasIndex(e => e.EmployeeId)
            .IsUnique();

        builder.Property(e => e.FirstName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.LastName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.DateOfBirth)
            .IsRequired();

        builder.Property(e => e.Email)
            .HasMaxLength(255);

        builder.Property(e => e.PhoneNumber)
            .HasMaxLength(50);

        builder.Property(e => e.HireDate)
            .IsRequired();

        builder.Property(e => e.JobTitle)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Department)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(e => e.Status)
            .IsRequired();
    }
}
