using AutoMapper;
using Empoli.Data.Employee;
using Empoli.Data.Employee.Dtos;
using Empoli.Data.LeaveType;
using Empoli.Data.LeaveType.Dtos;

namespace Empoli.Configurations;

public class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<CreateEmployeeDto, Employee>();
        CreateMap<UpdateEmployeeDto, Employee>();
        CreateMap<Employee, EmployeeDto>();

        CreateMap<CreateLeaveTypeDto, LeaveType>();
        CreateMap<UpdateLeaveTypeDto, LeaveType>();
        CreateMap<LeaveType, LeaveTypeDto>();
    }
}