import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject(123);

subject.subscribe(console.log);
subject.subscribe(console.log);