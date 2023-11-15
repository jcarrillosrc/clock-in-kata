import assert from 'assert';
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {RegisterClockInCommandHandler} from "@/application/RegisterClockInCommandHandler";
import {ClockInApiRepository} from "@/infrastructure/ClockInApiRepository";
import {RegisterClockInCommand} from "@/application/RegisterClockInCommand";
import {ClockInRepository} from "@/domain/ClockInRepository";
import {stubObject} from "ts-sinon";
import {GpsApiRepository} from "@/infrastructure/GpsApiRepository";
import {GpsRepository} from "@/domain/GpsRepository";

chai.use(chaiAsPromised);
chai.should()

describe('time tracking', () => {
    context('Simple clock-in', () => {
        it('should send clock-in data successfully', () => {
            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository()
            )

            return handler.invoke(command).should.be.fulfilled
        });

        it('should reject operation due async operation fails', () => {
            const clockInRepository = new ClockInApiRepository()
            const clockInRepositoryStub = stubObject<ClockInRepository>(clockInRepository)
            clockInRepositoryStub.invoke.returns(Promise.reject())

            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                clockInRepositoryStub
            )

            return handler.invoke(command).should.be.rejected
        });
    })

    context('GPS is optional', () => {
        it('should send clock-in with GPS data due GPS service is available', () => {
            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                new GpsApiRepository()
            )

            return handler.invoke(command).should.be.fulfilled
        });

        it('should send clock-in without GPS data due GPS service is not available', () => {
            const gpsApiRepository = new GpsApiRepository()
            const gpsApiRepositoryStub = stubObject<GpsRepository>(gpsApiRepository)
            gpsApiRepositoryStub.invoke.returns(Promise.reject())

            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                gpsApiRepositoryStub
            )

            return handler.invoke(command).should.be.fulfilled
        });
    });

    context('GPS is required', () => {
        it.skip('should send clock-in with required GPS data due GPS service is available', () => {
            assert(false, "Not implemented yet")
        });

        it.skip('should reject operation due GPS service is not available', () => {
            assert(false, "Not implemented yet")
        });

        it.skip('should send clock-in with required GPS data after few rejected GPS service calls', () => {
            assert(false, "Not implemented yet")
        });

        it.skip('should reject operation due GPS is not available after 3 retries', () => {
            assert(false, "Not implemented yet")
        });
    });
});
