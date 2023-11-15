import {GpsPosition} from "@/domain/GpsPosition";
import {GpsRepository} from "@/domain/GpsRepository";

export class GpsApiRepository implements GpsRepository {
    async invoke(): Promise<GpsPosition> {
        return { lat: "0.1234", lng: "-1.4321" }
    }
}