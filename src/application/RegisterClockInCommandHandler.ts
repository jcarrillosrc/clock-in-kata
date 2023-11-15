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
        const gpsPosition = await new Promise<GpsPosition | undefined>((resolve, reject) => {
            if(undefined === this.gpsRepository) {
                if( true === command.requiredPosition ){
                    reject(new Error("Undefined GPS client for required GPS position configuration"))
                    return
                }

                resolve(undefined)
                return
            }

            this.gpsRepository?.invoke()
                .then(resolve)
                .catch(() => {
                    if( true === command.requiredPosition ){
                        reject(new Error("Not available GPS position"))
                        return
                    }

                    console.warn("GPS position is not available")
                    resolve(undefined)
                })
        })

        return this.apiClient.invoke(gpsPosition)
    }
}