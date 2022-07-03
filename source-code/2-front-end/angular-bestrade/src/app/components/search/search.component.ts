import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  
  // Inject the router into the component
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nowSearch(value: string) {
    // Getting the logs of values for debugging purposes
    console.log(`value = ${value}`);
    /* Call the route search with the given keyword and routing the data to search route
    which will be handled by the ProductListComponent to reuse the logic and view for 
    listing products. */ 
    this.router.navigateByUrl(`/search/${value}`);
  }

}
