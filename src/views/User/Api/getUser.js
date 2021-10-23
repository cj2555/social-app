import Api from 'util/Api';
import Storage from 'util/Storage';

export const geUserList = async () => {

    try {
        const response = await Api.get('/usersList',
            {
                headers: {

                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + Storage.getToken()

                }


            }
        )
        return response.data
    } catch (err) {
        alert(err.message)
    }
}