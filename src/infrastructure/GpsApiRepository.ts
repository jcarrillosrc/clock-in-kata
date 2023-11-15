import {retry} from "ts-retry-promise";
import {GpsPosition} from "@/domain/GpsPosition";
import {GpsRepository} from "@/domain/GpsRepository";

export class GpsApiRepository implements GpsRepository {
    constructor(private readonly maxRetries: number = 0) {
    }

    async invoke(): Promise<GpsPosition> {
        const retries = (this.maxRetries > 0 ? (this.maxRetries - 1) : 0)
        return retry(
            () => this.requestData(),
            { retries }
        )
    }

    protected async requestData(): Promise<GpsPosition> {
        return { lat: "0.1234", lng: "-1.4321" }
    }
}