export interface ClockInRepository {
    invoke(): Promise<void>
}