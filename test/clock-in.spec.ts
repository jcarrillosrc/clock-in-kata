import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {RegisterClockInCommandHandler} from "@/application/RegisterClockInCommandHandler";
import {ClockInApiRepository} from "@/infrastructure/ClockInApiRepository";
import {RegisterClockInCommand} from "@/application/RegisterClockInCommand";
import {ClockInRepository} from "@/domain/ClockInRepository";
import {stubObject} from "ts-sinon";
import {GpsApiRepository} from "@/infrastructure/GpsApiRepository";
import {GpsRepository} from "@/domain/GpsRepository";
import {TestGpsApiRepository} from "./TestGpsApiRepository";
import {RegisterClockInResponse} from "@/application/RegisterClockInResponse";

chai.use(chaiAsPromised);
chai.should()

describe('time tracking', () => {
    context('Simple clock-in', () => {
        it('should send clock-in data successfully', () => {
            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository()
            )

            return handler.invoke(command).should.be.become(new RegisterClockInResponse(true, []))
        });

        it('should reject operation due async operation fails', () => {
            const expectedError = new Error("Cannot store clock-in record")
            const clockInRepository = new ClockInApiRepository()
            const clockInRepositoryStub = stubObject<ClockInRepository>(clockInRepository)
            clockInRepositoryStub.invoke.returns(Promise.reject(expectedError))

            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                clockInRepositoryStub
            )

            return handler.invoke(command).should.be.rejectedWith(expectedError.message)
        });
    })

    context('GPS is optional', () => {
        it('should send clock-in with GPS data due GPS service is available', () => {
            const command = new RegisterClockInCommand()
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                new GpsApiRepository()
            )

            return handler.invoke(command).should.be.become(new RegisterClockInResponse(true, []))
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

            const expectedResponse = new RegisterClockInResponse(true, [
                "GPS position is not available"
            ])

            return handler.invoke(command).should.be.become(expectedResponse)
        });
    });

    context('GPS is required', () => {
        it('should send clock-in with required GPS data due GPS service is available', () => {
            const command = new RegisterClockInCommand(true)
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                new GpsApiRepository()
            )

            const expectedResponse = new RegisterClockInResponse(true, [])
            return handler.invoke(command).should.be.become(expectedResponse)
        });

        it('should reject operation due GPS service is not available', () => {
            const gpsApiRepository = new GpsApiRepository()
            const gpsApiRepositoryStub = stubObject<GpsRepository>(gpsApiRepository)
            gpsApiRepositoryStub.invoke.returns(Promise.reject())

            const command = new RegisterClockInCommand(true)
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                gpsApiRepositoryStub
            )

            return handler.invoke(command).should.be.rejectedWith("Not available GPS position")
        });

        it('should send clock-in with required GPS data after few rejected GPS service calls', () => {
            const gpsApiRepository = new TestGpsApiRepository(3)
            const gpsApiRepositoryStub = stubObject<TestGpsApiRepository>(gpsApiRepository, ["requestData"])
            gpsApiRepositoryStub.requestData.onCall(0).returns(Promise.reject(new Error("Not available on first try")))
            gpsApiRepositoryStub.requestData.onCall(1).returns(Promise.reject(new Error("Not available on second try")))
            gpsApiRepositoryStub.requestData.onCall(2).returns(Promise.resolve({lat: "0.1234", lng: "-1.4321"}))

            const command = new RegisterClockInCommand(true)
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                gpsApiRepositoryStub
            )

            const expectedResponse = new RegisterClockInResponse(true, [])
            return handler.invoke(command).should.be.become(expectedResponse)
        });

        it('should reject operation due GPS is not available after few retries', () => {
            const gpsApiRepository = new TestGpsApiRepository(3)
            const gpsApiRepositoryStub = stubObject<TestGpsApiRepository>(gpsApiRepository, ["requestData"])
            gpsApiRepositoryStub.requestData.onCall(0).returns(Promise.reject(new Error("Not available on first try")))
            gpsApiRepositoryStub.requestData.onCall(1).returns(Promise.reject(new Error("Not available on second try")))
            gpsApiRepositoryStub.requestData.onCall(2).returns(Promise.reject(new Error("Not available on second try")))

            const command = new RegisterClockInCommand(true)
            const handler = new RegisterClockInCommandHandler(
                new ClockInApiRepository(),
                gpsApiRepositoryStub
            )

            return handler.invoke(command).should.be.rejectedWith("Not available GPS position")
        });
    });
});
