import assert from 'assert';

describe('time tracking', () => {
    context('Simple clock-in', () => {
        it.skip('should send clock-in data successfully', () => {
            assert(false, "Not implemented yet")
        });

        it.skip('should reject operation due async operation fails', () => {
            assert(false, "Not implemented yet")
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
