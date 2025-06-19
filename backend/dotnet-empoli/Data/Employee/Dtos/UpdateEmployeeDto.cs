namespace Empoli.Data.Employee.Dtos;

public class UpdateEmployeeDto
{
    public string EmployeeId { get; set; } = null!;
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime? HireDate { get; set; }
    public string? JobTitle { get; set; }
    public string? Department { get; set; }
    public bool? Status { get; set; }
}
