import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  isAllowed = false;
  serverCreateStatus = 'No new server created'
  newServerName = 'some prefilled';
  isServerCreated = false;
  appServers = ['server1', 'server2', 'server3']

  constructor() { 
    setTimeout(()=>{
      // this.isAllowed = true;
    },3000)
  }

  ngOnInit(): void {
  }

  changeServerCreateStatus(){
    this.isServerCreated = true;
    this.serverCreateStatus = "Server created successfully";
    this.appServers.push(this.newServerName);
  }

  onUpdateServerName(event: Event){
    
  }

}
