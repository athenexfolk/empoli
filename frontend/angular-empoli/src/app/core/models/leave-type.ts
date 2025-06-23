export interface LeaveType {
    id: string;
    name: string;
    description: string;
    maxDays: number;
    requireApproval: boolean;
    paidLeave: boolean;
}
