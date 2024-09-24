const interpolatePoints = (fromDate, toDate, data) => {
    const diff = toDate.getTime() - fromDate.getTime();
    const interpolatedDate = new Date(fromDate.getTime() + (diff / 2));
    const keysPairs = Object.keys(data).map((key) => [key, null]);
    const interpolatedObject = Object.fromEntries(keysPairs);

    interpolatedDate.date = interpolatedDate;

    return interpolatedObject;
}

const fillTime = (data, interval: number) => {
    const filledData = [];

    let i = 0;
    while (i < data.length - 1) {
        const a = new Date(data[i].date);
        const b = new Date(data[i + 1].date);

        const diff = b.getTime() - a.getTime();

        filledData.push(data[i]);
        if (diff > interval) {
            filledData.push(interpolatePoints(a, b, data[i]));
        }

        i += 1;
    }

    if (data.length >= 2) {
        filledData.push(data[i]);
    }

    return filledData;
}

export default fillTime;