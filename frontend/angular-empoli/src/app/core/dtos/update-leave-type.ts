export interface UpdateLeaveTypeDto {
    name: string;
    description: string;
    maxDays: number;
    requireApproval: boolean;
    paidLeave: boolean;
}
