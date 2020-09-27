import axios from 'axios';

class SafeRequest {
  static fetch(url) {
    const result = {
      code: 0,
      message: '',
      data: null,
    };

    return new Promise((resolve) => {
      axios(url)
        .then((res) => {
          result.data = res.data;
          resolve(result);
        })
        .catch((e) => {
          result.code = 1;
          result.message = e.message;
          result.data = [
            {
              id: 1,
              name: '《轻量级函数式编程》',
            },
            {
              id: 2,
              name: '《You dont know javascirpt》',
            },
          ];
          resolve(result);
        });
    });
  }
}

export default SafeRequest;
