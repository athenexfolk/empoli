namespace dotnet_empoli.Dtos;

public class CreateEmployeeDto
{
    public string Code { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
}
