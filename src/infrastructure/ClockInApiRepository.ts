import {ClockInRepository} from "@/domain/ClockInRepository";

export class ClockInApiRepository implements ClockInRepository{
    invoke(): Promise<void> {
        return new Promise((resolve) => {
            resolve()
        })
    }
}