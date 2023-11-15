import {ClockInRepository} from "@/domain/ClockInRepository";
import {RegisterClockInCommand} from "@/application/RegisterClockInCommand";
import {GpsRepository} from "@/domain/GpsRepository";
import {GpsPosition} from "@/domain/GpsPosition";
import {RegisterClockInResponse} from "@/application/RegisterClockInResponse";

export class RegisterClockInCommandHandler {
    constructor(
        private readonly apiClient: ClockInRepository,
        private readonly gpsRepository?: GpsRepository,
    ) {
    }

    async invoke(command: RegisterClockInCommand): Promise<RegisterClockInResponse> {
        if(undefined === this.gpsRepository) {
            if( true === command.requiredPosition ){
                throw new Error("Undefined GPS client for required GPS position configuration")
            }

            await this.apiClient.invoke()
            return new RegisterClockInResponse(true, [])
        }

        const gpsPosition = await new Promise<GpsPosition | undefined>((resolve, reject) => {
            this.gpsRepository?.invoke()
                .then(resolve)
                .catch(() => {
                    if( true === command.requiredPosition ){
                        reject(new Error("Not available GPS position"))
                        return
                    }

                    resolve(undefined)
                })
        })

        const clockInRecord = await this.apiClient.invoke(gpsPosition)

        return RegisterClockInResponse.fomClockInRecord(clockInRecord)
    }
}