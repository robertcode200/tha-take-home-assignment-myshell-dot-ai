import sum from './sum';

test('adds 1 and 2 to equal 3', () => {
    // Arrange
    let x = 1;
    let y = 2;
    let expected = 3;

    // Act
    let actual = sum(x, y);

    // Assert
    expect(actual).toBe(expected);
});
