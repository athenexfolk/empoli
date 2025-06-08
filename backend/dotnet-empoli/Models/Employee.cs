using System.ComponentModel.DataAnnotations;

namespace dotnet_empoli.Models;

public class Employee
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Code { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string FirstName { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string LastName { get; set; } = null!;
}
