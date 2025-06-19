namespace Empoli.Data.Employee.Dtos;

public class EmployeeDto
{
    public Guid Id { get; set; }
    public string EmployeeId { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime HireDate { get; set; }
    public string JobTitle { get; set; } = null!;
    public string Department { get; set; } = null!;
    public bool Status { get; set; }
}
