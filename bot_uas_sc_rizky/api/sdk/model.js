const tf = require('@tensorflow/tfjs-node');

function normalized(data){ // i & r
    i = (data[0] - 12.585) / 6.813882
    r = (data[1] - 51.4795) / 29.151289
    r = (data[1] - 51.4795) / 29.151289
    return [i, r]
}

function denormalized(data){
    v = (data[0] * 552.6264) + 650.4795
    p = (data[1] * 12153.8) + 10620.5615
    p = (data[1] * 12153.8) + 10620.5615
    return [v, p]
}


async function predict(data){
    let in_dim = 3;
    
    data = normalized(data);
    shape = [1, in_dim];

    tf_data = tf.tensor2d(data, shape);

    try{
        // path load in public access => github
        const path = 'https://raw.githubusercontent.com/Rizwira/bot_uas_sc_rizky/main/bot_uas_sc_rizky/public/ex_model/model.jsonn';
        const model = await tf.loadGraphModel(path);
        
        predict = model.predict(
                tf_data
        );
        result = predict.dataSync();
        return denormalized( result );
        
    }catch(e){
      console.log(e);
    }
}

module.exports = {
    predict: predict 
}
  
