export interface CreateLeaveTypeDto {
    name: string;
    description: string;
    maxDays: number;
    requireApproval: boolean;
    paidLeave: boolean;
}
