using Empoli.Data;
using Empoli.Services;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Empoli.Filters;
using FluentValidation;
using Empoli.Data.Employee.Dtos.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddValidatorsFromAssemblyContaining<CreateEmployeeDtoValidator>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddScoped<EmployeeService>();
builder.Services.AddScoped<LeaveTypeService>();
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidateModelAttribute>();
});
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
