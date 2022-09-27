export const convertSelectedImageToBase64 =  (file , cbfunction) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cbfunction(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}