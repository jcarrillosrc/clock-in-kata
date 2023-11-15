import {ClockInRepository} from "@/domain/ClockInRepository";
import {RegisterClockInCommand} from "@/application/RegisterClockInCommand";
import {GpsRepository} from "@/domain/GpsRepository";
import {GpsPosition} from "@/domain/GpsPosition";

export class RegisterClockInCommandHandler {
    constructor(
        private readonly apiClient: ClockInRepository,
        private readonly gpsRepository?: GpsRepository,
    ) {
    }

    async invoke(command: RegisterClockInCommand): Promise<void> {
        const gpsPosition = await new Promise<GpsPosition | undefined>((resolve) => {
            if(undefined === this.gpsRepository) {
                resolve(undefined)
                return
            }

            this.gpsRepository?.invoke()
                .then(resolve)
                .catch(() => {
                    console.warn("GPS position is not available")
                    resolve(undefined)
                })
        })

        return this.apiClient.invoke(gpsPosition)
    }
}