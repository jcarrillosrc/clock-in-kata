# JCarrilloSRC - Clock-In Kata

Clock-in kata based on the following link: 
https://kata-log.rocks/clock-in-kata

## Getting started
```shell
# Install project dependencies
npm install
```

## Run 
Clock-in kata was built to be executed from tests
```shell
# Run tests
npm run test
```

## Application design description
- I used DDD design to apply some patters like Dependency Inversion or Ports Adapter. 
- All uses cases are defined as commands/handler using CQRS pattern (but without command bus)

## Pending to implement in the application
- Timeout handlers
- Add test spy classes to assert method executions, arguments received and data returned.

## Extra time improvements
- Split `RegisterClockInCommand` into two different commands. One for not necessary GPS Position and another one for Optional GPS Position
- Add CQRS command bus to execute and handler application commands

## Self-evaluation
> 1 (Not ready) and 5 (100% ready)

I think the tests are 95% done because I haven't handled timeout cases and haven't implemented any "spy" for method order calls and other kata hints.