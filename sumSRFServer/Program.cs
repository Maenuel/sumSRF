using Microsoft.Extensions.Configuration;
using Azure;
using Azure.AI.OpenAI;
using System;
using System.ClientModel;
using System.IO;
using System.Threading.Tasks;
using OpenAI;
using OpenAI.Assistants;
using OpenAI.Chat;
using OpenAI.Files;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/sumSRF", (SumRequest request) =>
{
    var text = request.link;
    var configuration = app.Services.GetRequiredService<IConfiguration>();
    string endpoint = configuration["AzureOpenAI:Endpoint"];
    string apiKey = configuration["AzureOpenAI:ApiKey"];
    string deploymentName = configuration["AzureOpenAI:DeploymentName"];

    var openAIClient = new AzureOpenAIClient(new Uri(endpoint), new AzureKeyCredential(apiKey));

// Use for passwordless auth
//var openAIClient = new AzureOpenAIClient(new Uri(endpoint), new DefaultAzureCredential()); 


    
    return Results.Json(text);
})
.WithName("SumSRF")
.WithOpenApi();

app.Run();


record SumRequest(int link);