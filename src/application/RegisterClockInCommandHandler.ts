import {ClockInRepository} from "@/domain/ClockInRepository";
import {RegisterClockInCommand} from "@/application/RegisterClockInCommand";

export class RegisterClockInCommandHandler {
    constructor(
        private readonly apiClient: ClockInRepository,
    ) {
    }

    async invoke(command: RegisterClockInCommand): Promise<void> {
        return this.apiClient.invoke()
    }
}