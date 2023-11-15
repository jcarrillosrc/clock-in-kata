import assert from 'assert';
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {RegisterClockInCommandHandler} from "@/application/RegisterClockInCommandHandler";
import {ClockInApiRepository} from "@/infrastructure/ClockInApiRepository";
import {RegisterClockInCommand} from "@/application/RegisterClockInCommand";
import {ClockInRepository} from "@/domain/ClockInRepository";
import {stubObject} from "ts-sinon";

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
        it.skip('should send clock-in with GPS data due GPS service is available', () => {
            assert(false, "Not implemented yet")
        });

        it.skip('should send clock-in without GPS data due GPS service is not available', () => {
            assert(false, "Not implemented yet")
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
