
import Api from 'util/Api';
import Storage from 'util/Storage';

export const fetchService = async (path, id) => {

    try {
        if (id) {
            const response = await Api.get(`/${path}/${props.id}`,
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                
            );
            return response.data;
        }
        else {
            //if props has no id then fetch all services
            const response = await Api.get(`/${path}`,
            
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                
            );
            return response.data;

        }

    } catch (error) {
        alert(error.message);
    }

}

