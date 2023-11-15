import {GpsApiRepository} from "@/infrastructure/GpsApiRepository";
import {GpsPosition} from "@/domain/GpsPosition";

export class TestGpsApiRepository extends GpsApiRepository {
    constructor(maxRetries: number = 0) {
        super(maxRetries);
    }

    public async requestData(): Promise<GpsPosition> {
        return super.requestData();
    }
}