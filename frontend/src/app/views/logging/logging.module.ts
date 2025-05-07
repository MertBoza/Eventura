import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { LoggingRoutingModule } from "./logging-routing.module"


@NgModule({
 
  declarations: [
    
  ],
  imports: [
    CommonModule,
    LoggingRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    
  ],
})
export class LoggingModule {}
