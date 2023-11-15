import {GpsPosition} from "@/domain/GpsPosition";

export interface GpsRepository {
    invoke(): Promise<GpsPosition>
}