import { Injectable } from '@angular/core';
import {Post} from "../model/post";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Job} from "../model/job";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {JobLike} from "../model/joblike";
import {Likes} from "../model/likes";

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private jobsUrl = 'http://localhost:8080/jobs';
  private usersUrl = 'http://localhost:8080/users';
  private joblikesUrl = 'http://localhost:8080/joblikes';

  constructor(private http: HttpClient) { }

  getUser(user: number): Observable<User>{
    return this.http.get<User>(this.usersUrl+"/getbyid/"+user);
  }

  saveNewJob(jb:string,user:User): Observable<Post> {
    console.log("saving new post");
    var newjob: Job;
    newjob=new Job();
    newjob.body=jb;
    newjob.user=user;
    newjob.createdDate = new Date();
    return this.http.post<Post>(this.jobsUrl, newjob);
  }

  getMyJobs(user:User): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl+"/"+user.id);
  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobsUrl);
  }

  getJobsBySkills(skills: string): Observable<Job[]> {
    if (skills == null)
      return this.http.get<Job[]>(this.jobsUrl);
    else
      // var regskills = skills.replace(/\s/g , "+");
      console.log(this.jobsUrl+'?search='+encodeURIComponent(skills));
      return this.http.get<Job[]>(this.jobsUrl+'?search='+encodeURIComponent(skills));
  }

  saveLike(jl: JobLike): Observable<Post> {
    console.log(jl);
    return this.http.post<Post>(this.joblikesUrl, jl);
  }

  getJobLikes(job_id:number): Observable<JobLike[]>{
    return this.http.get<JobLike[]>(this.joblikesUrl+"/ofpost/"+job_id);
  }
}
