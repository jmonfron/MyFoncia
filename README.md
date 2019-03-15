Lancer les tests:
   
    make test
    
Lancer le service ( accessible sur le port 3000 ):
   
    make dev
    
Routes: 

 Login ( recuperation du token ): 
 
    {
        url: http://localhost:3000/users/login,
        method: POST,
        body: {
            login: 'john',
            password: 'myfonciapassword'
        }
    }
Client: 
 
    {
        url: http://localhost:3000/clients,
        method: GET,
        headers: {
            Authorization: token
        }
        query(optionnel): { 
            page (numero de la page, par default: 1),
            number (nombre de clients par page, par default: 10) 
        },
        example: http://localhost:3000/clients?page=2&number=5
    }
        
Gestionnaires:


    {
        url: http://localhost:3000/gestionnaire/:fullname,
        method: GET,
        headers: {
            Authorization: token
        }
        params: {
            fullname
        }
        example: http://localhost:3000/gestionnaires?fullname=MathieuBalavard
        ou : http://localhost:3000/gestionnaires?fullname=mathieu%balavard
    }
    
    
    