import traineeController from '../controllers/trainee/Controller';
describe('route checking', () => {
    test('testing', () => {
        expect(traineeController.get).toBeDefined();
        expect(traineeController.create).toBeDefined();
        expect(traineeController.updateTrainee).toBeDefined();
        expect(traineeController.deleteTrainee).toBeDefined();
    });
});
