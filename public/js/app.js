
const dataBaseUser = []
let SpecialCharacter_name = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/
let SpecialCharacter_email = /@/
let ForPasword =  /(?=.*[@#*_+/])/
console.log(dataBaseUser);


let askUsername = true
        while(askUsername){
            
             askUsername = prompt("choose: signing up , logging in or changing the password")
            if (askUsername == "exit"){
                break
            }
                // signing up********************
            if (askUsername == "signing up") {
                var user = {}

                // name****************************************
                let nameUser = prompt("enter your name :").trim()
            
                while(true){
                     
                    if (nameUser.length>=5 && SpecialCharacter_name.test(nameUser)==false && nameUser.charAt(0)==nameUser.charAt(0).toUpperCase() ) {
                    user.Name= nameUser.charAt(0).toUpperCase() + nameUser.slice(1).toLowerCase()
                    
                    break
                }else if(SpecialCharacter_name.test(nameUser)){
                   
                    nameUser = prompt("enter your name bla" + SpecialCharacter_name).trim()
                    
                }else if(nameUser.charAt(0)  != nameUser.charAt(0).toUpperCase()){
                    nameUser = prompt("the first letter should remain capitalized" ).trim()
                 } else{
                     nameUser = prompt("smiya raha 9siira :")
                }
                }
                // email *********************************************
                let emailUser = prompt("enter your email:").trim()
                
               while(true){
                emailUser = emailUser.toLowerCase()
                let check = dataBaseUser.findIndex(e => emailUser === e.Email) 
                if (emailUser.length <= 10) {
                    emailUser = prompt("Email is too short:").trim().toLowerCase();
                } else if (/\s/.test(emailUser)) {
                    emailUser = prompt("Email must not contain spaces:").trim().toLowerCase();
                } else if (emailUser.split("@").length > 2  ) {
                    emailUser = prompt("Email must contain exactly one '@':").trim().toLowerCase();
                } else if (!SpecialCharacter_email.test(emailUser)) {
                    emailUser = prompt("Email format is invalid (missing '@' ):").trim().toLowerCase();
                } else if (check !== -1 && dataBaseUser.length >= 1) {
                    emailUser = prompt("Email is already used:").trim().toLowerCase();
                } else {
                    user.Email = emailUser;
                    break;
                }
                          
                }
                
              
               // Age *********************************************

                let AgeUser= prompt("enter your Age:")
                
                while(true){
                     if(AgeUser != Number(AgeUser)){
                        AgeUser= prompt("DAKHAL RA9M")
                    }else if ( /\s/.test(AgeUser)) {
                        AgeUser= prompt("enter your Age bla spaces:")
                    }
                    else if (AgeUser>1 && AgeUser<100) {
                        user.Age= AgeUser
                        break
                    }
                    
                }


                // Password *********************************************



                let PasswordUser= prompt("enter your Password:")
                
                
               while(true){
                 let ConPasswordUser= prompt("confirmed Password:")
                 if (PasswordUser.length <=7) {
                    PasswordUser= prompt("Require at least 7 characters:")
                 }else if (ForPasword.test(PasswordUser) == false){
                    PasswordUser= prompt("Require at least one special character from" + ForPasword)
                 }else if (PasswordUser==ConPasswordUser) {
                    user.Password= PasswordUser
                    alert("mar7ba bk m3ana")
                    break
                }else{
                    alert("Password incorrect" )   
                }
               }
                
                dataBaseUser.push(user)
                }

                // logging in*****************************************************
                
            else if (askUsername == "logging in") {
            let loginEmail = prompt("Enter your email:").trim().toLowerCase()
            let loginPassword = prompt("Enter your password:").trim()

            
                // اhadi bach n9albo 3la l user*************************************
            for (let i = 0; i < dataBaseUser.length; i++) {
              if (dataBaseUser[i].Email === loginEmail && dataBaseUser[i].Password === loginPassword) {
            alert("Login successful! Welcome, " + dataBaseUser[i].Name)
            
            let currentUser = dataBaseUser[i];

            // hna l user ba9i ma3ndo 7at chi ruyal*************************************
            
                if (currentUser.Balance === undefined) {
                currentUser.Balance = 0
                currentUser.History = []
                currentUser.Loan = 0
                currentUser.Investment = 0
                }
            

            while (true) {
                let operation = prompt("Choose an operation: withdraw, deposit, loan, invest, history, logout")
                // logout**************************************
                if (operation == "logout") {
                    alert("Logged out successfully.")
                    break;
                }

                // Withdraw**************************************
                else if (operation == "withdraw") {
                    let amount = Number(prompt("Enter amount to withdraw:"))
                    if (amount <= currentUser.Balance) {
                        currentUser.Balance -= amount;
                        currentUser.History.push("Withdraw: "+ amount);
                        alert("Withdrawal successful. New balance: "+ currentUser.Balance);
                    } else {
                        alert("Insufficient ");
                    }
                }

                // Deposit************************************
                else if (operation == "deposit") {
                    let amount = Number(prompt("Enter amount to deposit (max 1000DH):"));
                    if (amount <= 1000) {
                        currentUser.Balance += amount;
                        currentUser.History.push("Deposit: " + amount);
                        alert("Deposit successful. New balance: " + currentUser.Balance);
                    } else {
                        alert("Cannot deposit more than 1000.");
                    }
                }

                // Loan********************************************
                else if (operation == "loan") {
                    let loanAmount = currentUser.Balance * 0.2;
                    currentUser.Balance += loanAmount;
                    currentUser.Loan += loanAmount;
                    currentUser.History.push("Loan taken: "+ loanAmount);
                    alert("Loan of "+ loanAmount +" added. New balance: "+ currentUser.Balance);
                }

                // Invest*********************************************
                else if (operation == "invest") {
                    let investAmount = Number(prompt("How much would you like to invest?"));
                    if (investAmount <= currentUser.Balance) {
                        currentUser.Balance -= investAmount;
                        currentUser.Investment += investAmount;
                        currentUser.History.push("Invested: " + investAmount);
                        alert("Investment successful.");
                    } else {
                        alert("You don't have enough funds.");
                    }
                }

                // History*************************************************************
                else if (operation == "history") {
                    alert("Transaction History: \n " + currentUser.History.join("\n"));
                }

                
                else {
                    alert("Unknown operation. Please try again.");
                }
            }

            
        }else{
        alert("Invalid email or password.");
    }
    }

     
}
           // changing the password*****************************************************
           else if (askUsername == "changing the password") {

            let loginEmail = prompt("Enter your email:").trim().toLowerCase();
           

            for (let i = 0; i < dataBaseUser.length; i++) {
              if (dataBaseUser[i].Email === loginEmail ) {
                let newPassword = prompt("enter new password")
                if (dataBaseUser[i].Password == newPassword) {
                    newPassword = prompt("enter new password")
                     while (true) {
                    if (newPassword === dataBaseUser[i].Password) {
                        newPassword = prompt("New password must be different. Try again:")
                    } else if (newPassword.length <= 7) {
                        newPassword = prompt("Password must be at least 8 characters:")
                    } else if (ForPasword.test(newPassword) === false) {
                        newPassword = prompt("Password must contain at least one special character (e.g. @ # * _ + /):")
                    } else {
                        dataBaseUser[i].Password = newPassword
                        alert("Password updated successfully!")
                        break;
                    }
                    }
                }
            }else{
                alert("had email makaynch")
            }
        }

           }
              
              
}
        

                
 



