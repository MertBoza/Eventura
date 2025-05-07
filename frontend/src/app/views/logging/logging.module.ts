import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { LoggingRoutingModule } from "./logging-routing.module"

// Import LoggingComponent as a standalone component

@NgModule({
  // No need to declare LoggingComponent in the 'declarations' array
  declarations: [
    // LoggingComponent is not declared here as it is a standalone component
  ],
  imports: [
    CommonModule,
    LoggingRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    // Remove standalone components from here - they should be imported where needed
  ],
})
export class LoggingModule {}
