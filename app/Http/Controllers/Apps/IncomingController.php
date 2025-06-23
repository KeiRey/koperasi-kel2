<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Models\IncomingProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IncomingController extends Controller
{
    public function index()
    {

        $incoming = IncomingProduct::when(request()->search, function ($products) {
            $products = $products->where('title', 'like', '%' . request()->search . '%');
        })->with('category')->latest()
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        //return inertia
        return Inertia::render('Dashboard/Incoming/Index', [
            'incoming' => $incoming,
        ]);
    }
}
